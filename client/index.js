const grpc = require('grpc');
const pancakes = require('./gen/api/pancake/maker/pancake_pb');
const services = require('./gen/api/pancake/maker/pancake_grpc_pb.js');

const server_host = 'localhost';
const server_port = '50051';

function main() {
  var client = new services.PancakeBakerServiceClient(
    server_host + ':' + server_port, 
    grpc.credentials.createInsecure()
  );
  var request = new pancakes.BakeRequest();
  request.setMenu(1);

  client.bake(request, function(_, response) {
    var pancake = response.getPancake()
    console.log('baked:', {
      chef_name: pancake.getChefName(),
      menu: pancake.getMenu(),
      technical_score: pancake.getTechnicalScore(),
      create_time: pancake.getCreateTime().getSeconds()
    });
  });
}

main()

