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
      ('Permissions', {'fields': ('is_active', 'is_staff', 'is_superuser')}),
      # ('Important dates', {'fields': ('last_login','date_joined',)}),
  )
  add_fieldsets = (
      (None, {
          'classes': ('wide',),
          'fields': ('email', 'password1', 'password2', 'is_staff', 'is_superuser'),
      }),
  )
  search_fields = ('email',)
  ordering = ('email',)
