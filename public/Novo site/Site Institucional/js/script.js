function calcular() {
    let valor_arduino = 150 * Number(qtd_lojas.value);
    let valor_sensor = 30 * Number(qtd_caixas.value);
    let valor_nuvem = 450;
    let valor_manutencao = 150 * Number(qtd_meses.value);
    let valor_total = valor_arduino + valor_nuvem + valor_sensor;

    total.innerHTML = valor_total;
    manutencao.innerHTML = valor_manutencao;
    orcamento.style.display="block"
}