var grpc = require("@grpc/grpc-js");

var calc_pb = require("../build/proto/calc_pb");
var calc_grpc_pb = require("../build/proto/calc_grpc_pb");

function getRpcDeadLine(){
    var timeAllowed = 1000; // one second

    return new Date(Date.now() + timeAllowed);
}

function call_calc_sqrt_service() {
  console.log(`---- call_calc_sqrt_service START ----`);

  var deadline = getRpcDeadLine();

  var calc_client = new calc_grpc_pb.calcClient(
    "localhost:50051",
    grpc.credentials.createInsecure()
  );

  var request = new calc_pb.ComputeRequest();
//   request.setNumber(-5);
  request.setNumber(5);

  calc_client.squareRoot(request, {deadline: deadline} ,(error, response) => {
    if (!error) {
      console.log("✅ response    ", response);
      console.log("✅ response.getResult()    ", response.getResult());
    } else {
      console.error(error);
    }
  });

  console.info(`---- call_calc_sqrt_service END ----`);
}
function main() {
  call_calc_sqrt_service();
}
main();
