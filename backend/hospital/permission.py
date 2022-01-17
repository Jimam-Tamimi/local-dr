from rest_framework.permissions import BasePermission

class IsHospital(BasePermission):
    def has_permission(self, request, view):        
        if request.user.is_authenticated:
            return request.user.is_authenticated and request.user.is_hospital
        return False

