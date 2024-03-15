import { useContext, useEffect, useMemo } from "react";
import { CarrinhoContext } from '@/context/CarrinhoContext';
import { ADD_PRODUTO, UPDATE_PRODUTO, REMOVED_PRODUTO } from "../reducers/carrinhoReduce";


const addProdutoAction = (novoProduto) => ({
    type: ADD_PRODUTO,
    payload: novoProduto,
})

const removeProdutoAction = (produtoId) => ({
    type: REMOVED_PRODUTO,
    payload: produtoId,
})

const updateProdutoAction = (produtoId, quantidade) => ({
    type: UPDATE_PRODUTO,
    payload: {produtoId, quantidade},
})

export const useCarrinhoContext = () => {
    const { dispatch, carrinho, quantidade, valorTotal, } = useContext(CarrinhoContext);

    function adicionarProduto(novoProduto) {
        dispatch(addProdutoAction(novoProduto));
    }

    function removerProduto(id) {
        const produto = carrinho.find((item) => item.id === id);

        if (produto && produto.quantidade > 1) {
            dispatch(updateProdutoAction(id, produto.quantidade - 1));
        } else {
            dispatch(removeProdutoAction(id));
        }
    }

    function removerProdutoCarrinho(id) {
        dispatch(removeProdutoAction(id));
    }

    return {
        carrinho,
        adicionarProduto,
        removerProduto,
        removerProdutoCarrinho,
        quantidade,
        valorTotal,
    };
};
