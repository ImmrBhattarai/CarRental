az acr login --name carrentalacr --resource-group CarRentalService

docker tag bff-rent-car-local carrentalacr.azurecr.io/bff-rent-car-local:v1

docker push carrentalacr.azurecr.io/bff-rent-car-local:v1

az containerapp env create --name bff-rent-car-local --resource-group CarRentalService --location central india

az containerapp create --name bff-rent-car-local --resource-group CarRentalService --location centralindia --environment bff-rent-car-local --image carrentalacr.azurecr.io/bff-rent-car-local:v1 --target-port 5001 --ingress 'external' --registry-server carrentalacr.azurecr.io 