function calcular() {
    
    if(qtd_lojas.value == "" && qtd_caixas.value == "" && qtd_meses.value == ""){
        Swal.fire({
          type: 'error',
          title: 'Tente novamente',
          text: 'Preencha os campos corretamente!',
        })
    } else{

    let valor_arduino = 150 * Number(qtd_lojas.value);
    let valor_sensor = 30 * Number(qtd_caixas.value);
    let valor_nuvem = 450;
    let valor_manutencao = 150 * Number(qtd_meses.value);
    let valor_total = valor_arduino + valor_nuvem + valor_sensor;
    Swal.fire({
        title: `O valor da compra de nossos serviços será de R$${valor_total}`,
        text: `Você irá pagar uma mensalidade de R$ ${valor_manutencao}. por manutenção!
         Contrantando o nosso serviço agora, você terá um desconto de 10% na contratação e a instalação será totalmente gratuita`,
        imageUrl: 'https://cdn.pixabay.com/photo/2016/03/31/19/51/acceptation-1295324_960_720.png',
        imageWidth: 120,
        imageHeight: 120,
        imageAlt: 'Custom image',
        animation: false
      })
    }
    }