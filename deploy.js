const path = require('path');
const archiver = require('archiver');
const fs = require('fs');
const { NodeSSH } = require('node-ssh');

const ssh = new NodeSSH();
const srcPath = path.resolve(__dirname, './dist');

const config = {
  host: '122.51.115.97',
  user: 'plutoweb',
  password: 'yogurt.55617',
  path: '/home/plutoweb/admin/public.zip',
};

startZip();

function startZip() {
  const archive = archiver('zip', {
    zlib: { level: 5 }, // 递归扫描最多5层
  }).on('error', error => {
    throw error;
  });

  var output = fs.createWriteStream(__dirname + '/public.zip').on('close', function(err) {
    /*压缩结束时会触发close事件，然后才能开始上传，
          否则会上传一个内容不全且无法使用的zip包*/
    if (err) {
      console.log('关闭archiver异常:', err);
      return;
    }
    console.log('已生成zip包');
    console.log('开始上传public.zip至远程机器...');
    uploadFile();
  });

  archive.pipe(output); //典型的node流用法
  archive.directory(srcPath, '/public'); //将srcPach路径对应的内容添加到zip包中/public路径
  archive.finalize();
}

//将dist目录上传至正式环境
function uploadFile() {
  ssh
    .connect({
      //configs存放的是连接远程机器的信息
      host: config.host,
      username: config.user,
      password: config.password,
      port: 22, //SSH连接默认在22端口
    })
    .then(function() {
      //上传网站的发布包至configs中配置的远程服务器的指定地址
      ssh
        .putFile(path.resolve(__dirname, './public.zip'), config.path)
        .then(function(status) {
          console.log('上传文件成功');
          console.log('开始执行远端脚本');
          startRemoteShell(); //上传成功后触发远端脚本
        })
        .catch(err => {
          console.log('文件传输异常:', err);
          process.exit(0);
        });
    })
    .catch(err => {
      console.log('ssh连接失败:', err);
      process.exit(0);
    });
}

function startRemoteShell() {
  //在服务器上cwd配置的路径下执行sh deploy.sh脚本来实现发布
  ssh.execCommand('sh deploy-admin.sh', { cwd: '/home/plutoweb/admin' }).then(function(result) {
    console.log('远程STDOUT输出: ' + result.stdout);
    console.log('远程STDERR输出: ' + result.stderr);
    if (!result.stderr) {
      console.log('发布成功!');
      process.exit(0);
    }
  });
}
