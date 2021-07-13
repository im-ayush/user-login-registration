from django.db import models

# Create your models here.
from django.contrib.auth.models import AbstractUser
from django.utils.translation import ugettext_lazy as _
from django.conf import settings


class CustomUser(AbstractUser):
    username = models.CharField(blank=True, null=True, max_length=10)
    email = models.EmailField(_('email address'), unique=True)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']

    dob = models.DateField(blank=True, null=True)
    photo = models.ImageField(upload_to='uploads', blank=True)

    def __str__(self):
        return "{}".format(self.email)
