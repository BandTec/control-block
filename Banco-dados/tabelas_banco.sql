create database ControlBlock;
use ControlBlock;

create table cliente (
	nome varchar(20),
    idCnpj char(18) primary key
);

create table lojas (
	idloja int primary key,
    nome varchar(20),
    fkCliente int,
    foreign key(fkCliente) references Cliente(idCnpj)
);

create table gerente (
	idgerente int primary key,
    foreign key(fklojas) references lojas(idlojas),
    cpf char(15),
    nome varchar(40)
);

create table sensores (
	idsensor int primary key,
    fkGerente int,
    foreign key(fkgerente) references gerente(idgerente)
);

create table eventos_s (
	idevento int primary key,
    foreign key(fksensores) references sensres(idsensor),
    hora char(8),
    dataregistro date,
    evento enum('0','1')
);

create table eventos_e (
	idevento int primary key,
    foreign key(fksensores) references sensres(idsensor),
    hora char(8),
    dataregistro date,
    evento enum('0','1')
);