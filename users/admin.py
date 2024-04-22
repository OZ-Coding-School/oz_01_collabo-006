from django.contrib import admin
from django.contrib.auth.admin import UserAdmin

from .models import User


@admin.register(User)
class CustomUserAdmin(UserAdmin):
    fieldsets = (
        (
            "User Info",
            {
                "fields": (
                    "nickname",
                    "email",
                    "is_active",
                )
            },
        ),
        ("Permissions", {"fields": ("is_staff", "is_superuser")}),
    )

    add_fieldsets = (
        (
            None,
            {
                "classes": ("wide",),
                "fields": (
                    "nickname",
                    "email",
                    "password1",
                    "password2",
                    "is_active",
                    "is_staff",
                    "is_superuser",
                ),
            },
        ),
    )

    list_display = (
        "id",
        "nickname",
        "email",
        "is_active",
        "is_staff",
        "is_superuser",
        "last_login",
    )
    search_fields = ("nickname", "email")
    ordering = ("id",)