from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from users.models import User


# Register your models here.
@admin.register(User)
class CustomUserAdmin(admin.ModelAdmin):
  list_display = ('email', 'date_joined', 'is_staff')
  list_filter = ('is_staff', 'is_superuser', 'is_active')
  fieldsets = (
      (None, {'fields': ('email', 'password')}),
      ('개인정보',{'fields':('first_name', 'last_name',)}),
      ('이미지필드', {'fields': ('profile_image','short_description',)}),
      ('권한', {'fields': ('is_active', 'is_staff', 'is_superuser')}),
  )
  add_fieldsets = (
      (None, {
          'classes': ('wide',),
          'fields': ('email', 'password1', 'password2', 'is_staff', 'is_superuser'),
      }),
  )
  search_fields = ('email',)
  ordering = ('email',)
