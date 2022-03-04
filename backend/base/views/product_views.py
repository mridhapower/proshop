from django.shortcuts import render
from base.products import products
from rest_framework.decorators import api_view,permission_classes
from rest_framework.response import Response
from base.models import Product
from base.serializer import ProductSerializer


@api_view(['GET'])
def getProducts(request):
    products=Product.objects.all()
    serializer=ProductSerializer(products,many=True)
    return Response(serializer.data)

@api_view(['GET'])
def getProduct(request,pk):
    product=Product.objects.get(_id=pk)
    serializer=ProductSerializer(product)
    return Response(serializer.data)