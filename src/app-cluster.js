var cluster = require('cluster');

function startWorker() {
    var worker = cluster.fork();
    console.log('CLUSTER: Worker %d started', worker.id);
}

if(cluster.isMaster){

    require('os').cpus().forEach(startWorker);

    // 연결이 끊어진 워커를 로그에 기록
    cluster.on('disconnect', function(worker){
        console.log('CLUSTER: Worker %d disconnected from the cluster.',
            worker.id);
    });

    // 워커가 종료되면 이를 대체할 새 워커 생성
    cluster.on('exit', function(worker, code, signal){
        console.log('CLUSTER: Worker %d died with exit code %d (%s)',
            worker.id, code, signal);
        startWorker();
    });

} else {
    const port = process.env.PORT || 3000
    require('./app.js')(port);
}