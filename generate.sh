mkdir build;

protoc -I=. ./proto/*.proto \
--js_out=import_style=commonjs,binary:./build \
--grpc_out=grpc_js:./build \
--plugin=protoc-gen-grpc=`which grpc_tools_node_protoc_plugin`