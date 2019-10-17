create table cliente (
    idCnpj char(18) primary key,
    nome varchar(20)
);

create table lojas (
	idloja int primary key,
    nome varchar(20),
    fkCliente int
);
alter table dbo.lojas add fkCliente char(18) foreign key references Cliente(idCnpj);

create table gerente (
	idgerente int primary key,
    cpf char(15),
    nome varchar(40)
);
alter table dbo.gerente add fklojas int foreign key references lojas(idloja);

create table sensores (
	idsensor int primary key,
);
alter table dbo.sensores add fkGerente int foreign key references gerente(idgerente);

create table eventos_s (
	idevento int primary key,
    hora char(8),
    dataregistro date,
    evento char(1)
);
alter table dbo.eventos_s add fkSensores int foreign key references sensores(idsensor);

create table eventos_e (
	idevento int primary key,
    hora char(8),
    dataregistro date,
    evento char(1)
);
alter table dbo.eventos_e add fkSensores int foreign key references sensores(idsensor);

exec sp_help lojas;