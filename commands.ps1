az acr login --name carrentalacr --resource-group CarRentalService

docker tag bff-rent-car-local carrentalacr.azurecr.io/bff-rent-car-local:v1

docker push carrentalacr.azurecr.io/bff-rent-car-local:v1

az containerapp env create --name bff-rent-car-local --resource-group CarRentalService --location centralindia

