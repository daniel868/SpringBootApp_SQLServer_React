package com.example.airport.dtos;

public interface DtoInterface<T, K> {
    public K mapTo(T to);

    public T mapFrom(K from);
}
