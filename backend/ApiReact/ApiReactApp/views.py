from rest_framework.views import APIView
from rest_framework import status
from .models import Cliente, Libro, AlquilerLibro
from django.http import JsonResponse
import logging

logger = logging.getLogger(__name__)

class ClienteAPIView(APIView):
    # Obtener todos los clientes
    def get(self, request):
        clientes = Cliente.objects.all().values()
        return JsonResponse(list(clientes), safe=False, status=status.HTTP_200_OK)

    # Crear un nuevo cliente
    def post(self, request):
        data = request.data
        print("Datos recibidos:", data)
        try:
            cliente = Cliente.objects.create(
                nombre=data.get('nombre'),
                email=data.get('email'),
                telefono=data.get('telefono')
            )
            return JsonResponse({'id': cliente.id, 'nombre': cliente.nombre}, status=status.HTTP_201_CREATED)
        except Exception as e:
            print("Error al crear cliente:", str(e))
            return JsonResponse({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)

class LibroAPIView(APIView):
    # Obtener todos los libros
    def get(self, request):
        libros = Libro.objects.all().values()
        return JsonResponse(list(libros), safe=False, status=status.HTTP_200_OK)

    # Crear un nuevo libro
    def post(self, request):
        data = request.data
        try:
            libro = Libro.objects.create(
                titulo=data.get('titulo'),
                autor=data.get('autor'),
                categoria=data.get('categoria'),
                stock=data.get('stock', 0)
            )
            return JsonResponse({'id': libro.id, 'titulo': libro.titulo}, status=status.HTTP_201_CREATED)
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)

logger = logging.getLogger(__name__)

class AlquilerLibroAPIView(APIView):
    # Obtener todos los alquileres de libros
    def get(self, request):
        alquileres = AlquilerLibro.objects.all().values(
            'id', 
            'cliente__nombre', 
            'libro__titulo', 
            'fecha_alquiler', 
            'fecha_devolucion'
        )
        logger.debug(f"Alquileres obtenidos: {list(alquileres)}")
        return JsonResponse(list(alquileres), safe=False, status=status.HTTP_200_OK)

    # Crear un nuevo alquiler de libro
    def post(self, request):
        data = request.data
        logger.debug(f"Datos recibidos en la solicitud: {data}")

        try:
            cliente_nombre = data.get('cliente_nombre')
            libro_titulo = data.get('libro_titulo')
            if not cliente_nombre or not libro_titulo:
                logger.error(f"Cliente o libro no proporcionados. Cliente: {cliente_nombre}, Libro: {libro_titulo}")
                return JsonResponse({'error': 'Cliente o libro no proporcionados.'}, status=status.HTTP_400_BAD_REQUEST)
            cliente = Cliente.objects.get(nombre=cliente_nombre)
            libro = Libro.objects.get(titulo=libro_titulo)

            logger.debug(f"Cliente encontrado: {cliente.nombre}")
            logger.debug(f"Libro encontrado: {libro.titulo}, Stock: {libro.stock}")

            # Stock
            if libro.stock <= 0:
                logger.warning(f"Stock insuficiente para el libro {libro.titulo}. Stock actual: {libro.stock}")
                return JsonResponse({'error': 'No hay suficiente stock para alquilar este libro.'}, status=status.HTTP_400_BAD_REQUEST)

            # Crear el alquiler
            alquiler = AlquilerLibro.objects.create(
                cliente=cliente,
                libro=libro,
                fecha_alquiler=data.get('fecha_alquiler'),
                fecha_devolucion=data.get('fecha_devolucion')
            )
            logger.debug(f"Alquiler creado con ID: {alquiler.id}")

            # Reducir el stock del libro
            libro.stock -= 1
            libro.save()
            logger.debug(f"Stock del libro {libro.titulo} actualizado. Nuevo stock: {libro.stock}")

            return JsonResponse({
                'id': alquiler.id,
                'cliente': cliente.nombre,
                'libro': libro.titulo,
                'fecha_alquiler': alquiler.fecha_alquiler,
                'fecha_devolucion': alquiler.fecha_devolucion
            }, status=status.HTTP_201_CREATED)

        except Cliente.DoesNotExist:
            logger.error(f"Cliente con nombre {cliente_nombre} no encontrado.")
            return JsonResponse({'error': 'Cliente no encontrado'}, status=status.HTTP_400_BAD_REQUEST)
        except Libro.DoesNotExist:
            logger.error(f"Libro con título {libro_titulo} no encontrado.")
            return JsonResponse({'error': 'Libro no encontrado'}, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            logger.error(f"Error inesperado: {str(e)}")
            return JsonResponse({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)