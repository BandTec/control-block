CREATE TABLE GERENTES (
	idGerente INT PRIMARY KEY IDENTITY(1,1),
	nome_gerente VARCHAR(50) NOT NULL,
	usuario_gerente VARCHAR(30) NOT NULL,
	email_gerente VARCHAR(40) UNIQUE NOT NULL,
	senha_gerente VARCHAR(20) NOT NULL,
	fkLojas INT,
	FOREIGN KEY (fkLojas) REFERENCES Lojas(idLojas)
);

CREATE TABLE LOJAS (
	idLojas INT PRIMARY KEY IDENTITY(1,1),
	CNPJ INT
);

CREATE TABLE SENSORES (
	idSensor INT PRIMARY KEY IDENTITY(1,1),
	fkLojas INT,
	FOREIGN KEY (fkLojas) REFERENCES Lojas(idLojas)
);

CREATE TABLE EVENTOS (
	idEvento INT PRIMARY KEY IDENTITY(1,1),
	tipo_sensor VARCHAR(10),
	hora_evento TIME,
	evento INT,
	data_evento DATE,
	fkSensores INT,
	FOREIGN KEY (fkSensores) REFERENCES SENSORES(idSensor)
);

SELECT * FROM GERENTES;
SELECT * FROM LOJAS;
SELECT * FROM SENSORES;
SELECT * FROM EVENTOS;