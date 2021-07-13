from rest_framework import serializers
from .models import CustomUser

class UserSerializer(serializers.HyperlinkedModelSerializer):
    """
    Bifrost user writable nested serializer
    """
    # photo = serializers.ImageField(max_length=None, allow_empty_file=False, allow_null=True,
    #                                 required=False)
    class Meta:
        model = CustomUser
        fields = ('first_name', 'last_name', 'email', 'dob', 'photo', 'id', 'url', 'is_active', 'password')
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        password = validated_data.pop('password')
        user = CustomUser(
                        email= validated_data.get('email', None),
                        dob= validated_data.get('dob', None),
                        first_name= validated_data.get('first_name', ""),
                        last_name= validated_data.get('last_name', ""),
                        photo= validated_data.get('photo', ""),
                        username= validated_data.get('username', "ANO"),
                        )
        user.set_password(password)
        user.save()
        return user

    def update(self, instance, validated_data):
        for attr, value in validated_data.items():
            if attr == 'password':
                instance.set_password(value)
            else:
                setattr(instance, attr, value)
        instance.save()
        return instance
