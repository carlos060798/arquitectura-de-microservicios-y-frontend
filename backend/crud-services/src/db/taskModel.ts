// src/entity/Tarea.ts
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Tarea {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ type: 'varchar' }) // Definido explícitamente como 'varchar'
    nombre!: string;

    @Column({ type: 'text', nullable: true }) // Definido explícitamente como 'text' y opcional
    descripcion?: string;

    @Column({ type: 'varchar' }) // Definido explícitamente como 'varchar'
    estado!: string;

    @Column({ type: 'varchar' }) // Definido explícitamente como 'text' y opcional
    userproperty!: string;
    @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' }) // Cambiado de 'timestamp' a 'datetime'
    fechaCreacion!: Date;


}