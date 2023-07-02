var grpc = require("@grpc/grpc-js");

var calc_pb = require("../build/proto/calc_pb");
var calc_grpc_pb = require("../build/proto/calc_grpc_pb");

function squareRoot(call, callback) {
  var number = call.request.getNumber();

  if(number >= 0){
    var result = Math.sqrt(number);

    console.log('✅ result    ', result)
    
    var response = new calc_pb.ComputeResponse();
    response.setResult(result);

    setTimeout(() => {
console.log('just for deadline test');
    }, 5000);
    // return callback(null, response);
  }else{
    // Error Handling
    return callback({
        code: grpc.status.INVALID_ARGUMENT,
        message: `Number sent is: ${number}`
    });
  }
}

function main() {
  var server = new grpc.Server();

  server.addService(calc_grpc_pb.calcService, {
    squareRoot: squareRoot,
  });

  server.bindAsync(
    "127.0.0.1:50051",
    grpc.ServerCredentials.createInsecure(),
    () => {
      server.start();
      console.log("✅ Server started:  127.0.0.1:50051");
    }
  );
}
main();
