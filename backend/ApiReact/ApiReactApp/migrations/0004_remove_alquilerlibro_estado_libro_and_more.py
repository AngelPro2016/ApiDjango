# Generated by Django 5.1.3 on 2024-11-26 23:13

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('ApiReactApp', '0003_remove_libro_disponible_libro_categoria_libro_stock_and_more'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='alquilerlibro',
            name='estado_libro',
        ),
        migrations.RemoveField(
            model_name='alquilerlibro',
            name='precio',
        ),
    ]
