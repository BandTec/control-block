create table gerente (
idgerente int primary key,
nome_gerente varchar(50) NOT NULL,
usuario_gerente varchar(30) NOT NULL,
email_gerente varchar(40) UNIQUE NOT NULL,
senha_gerente varchar(20) NOT NULL,
fklojas int,
foreign key (fklojas) references Lojas(idlojas)
);

create table lojas (
idLojas int primary key, 
cnpj bigint
);

create table sensores (
idsensor int primary key,
fklojas int,
foreign key (fklojas) references Lojas(idlojas)
);


create table eventos (
idEvento int primary key,
tipo_sensor varchar(10) NOT NULL,
hora_evento time NOT NULL,
evento int NOT NULL,
data_evento date NOT NULL,
fksensores int,
foreign key (fksensores) references Sensores(idsensor)
);

select *from gerente;
select *from lojas;
select *from sensores;
select *from eventos;