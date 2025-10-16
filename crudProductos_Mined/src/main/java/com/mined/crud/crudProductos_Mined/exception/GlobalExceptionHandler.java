package com.mined.crud.crudProductos_Mined.exception;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.ConstraintViolation;
import jakarta.validation.ConstraintViolationException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.List;
import java.util.stream.Collectors;

@RestControllerAdvice
@Slf4j
public class GlobalExceptionHandler {

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ErrorResponse> handleValidationException(
            MethodArgumentNotValidException ex, HttpServletRequest request) {
        
        List<ErrorResponse.FieldError> details = ex.getBindingResult()
                .getFieldErrors()
                .stream()
                .map(error -> new ErrorResponse.FieldError(
                        error.getField(), 
                        error.getDefaultMessage()))
                .collect(Collectors.toList());

        ErrorResponse errorResponse = new ErrorResponse(
                "Bad Request",
                "Validación fallida",
                request.getRequestURI()
        );
        errorResponse.setDetails(details);

        log.warn("Validation failed for request: {} - Details: {}", request.getRequestURI(), details);
        
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errorResponse);
    }

    @ExceptionHandler(ConstraintViolationException.class)
    public ResponseEntity<ErrorResponse> handleConstraintViolationException(
            ConstraintViolationException ex, HttpServletRequest request) {
        
        List<ErrorResponse.FieldError> details = ex.getConstraintViolations()
                .stream()
                .map(violation -> new ErrorResponse.FieldError(
                        getFieldName(violation),
                        violation.getMessage()))
                .collect(Collectors.toList());

        ErrorResponse errorResponse = new ErrorResponse(
                "Bad Request",
                "Validación fallida",
                request.getRequestURI()
        );
        errorResponse.setDetails(details);

        log.warn("Constraint violation for request: {} - Details: {}", request.getRequestURI(), details);
        
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errorResponse);
    }

    @ExceptionHandler(NotFoundException.class)
    public ResponseEntity<ErrorResponse> handleNotFoundException(
            NotFoundException ex, HttpServletRequest request) {
        
        ErrorResponse errorResponse = new ErrorResponse(
                "Not Found",
                ex.getMessage(),
                request.getRequestURI()
        );

        log.warn("Resource not found for request: {} - Message: {}", request.getRequestURI(), ex.getMessage());
        
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(errorResponse);
    }

    @ExceptionHandler(DataIntegrityViolationException.class)
    public ResponseEntity<ErrorResponse> handleDataIntegrityViolationException(
            DataIntegrityViolationException ex, HttpServletRequest request) {
        
        ErrorResponse errorResponse = new ErrorResponse(
                "Conflict",
                "Conflicto de datos",
                request.getRequestURI()
        );

        log.error("Data integrity violation for request: {} - Message: {}", 
                request.getRequestURI(), ex.getMessage());
        
        return ResponseEntity.status(HttpStatus.CONFLICT).body(errorResponse);
    }

    @ExceptionHandler(IllegalArgumentException.class)
    public ResponseEntity<ErrorResponse> handleIllegalArgumentException(
            IllegalArgumentException ex, HttpServletRequest request) {
        
        ErrorResponse errorResponse = new ErrorResponse(
                "Bad Request",
                ex.getMessage(),
                request.getRequestURI()
        );

        log.warn("Invalid argument for request: {} - Message: {}", request.getRequestURI(), ex.getMessage());
        
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errorResponse);
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<ErrorResponse> handleGenericException(
            Exception ex, HttpServletRequest request) {
        
        ErrorResponse errorResponse = new ErrorResponse(
                "Internal Server Error",
                "Error inesperado",
                request.getRequestURI()
        );

        log.error("Unexpected error for request: {} - Exception: {}", 
                request.getRequestURI(), ex.getMessage(), ex);
        
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorResponse);
    }

    private String getFieldName(ConstraintViolation<?> violation) {
        String propertyPath = violation.getPropertyPath().toString();
        String[] parts = propertyPath.split("\\.");
        return parts.length > 0 ? parts[parts.length - 1] : propertyPath;
    }
}