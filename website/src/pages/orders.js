import React, {useEffect, useState} from "react";
import {Button, Card, Row, Col} from "antd";
import {socket} from "../global/header";
import Board, { moveCard, addCard } from "@lourenci/react-kanban";
import "@lourenci/react-kanban/dist/styles.css";

const board = {
  columns: [
    {
      id: 1,
      title: "Pedidos",
      status: "pending",
      cards: []
    },
    {
      id: 2,
      title: "Fazendo",
      status: "doing",
      cards: []
    },
    {
      id: 3,
      title: "Feito",
      status: "done",
      cards: []
    },
    {
      id: 4,
      title: "Entregue",
      status: "delivered",
      cards: []
    }
  ]
};

const CustomCard = (card, cardBag) => {
  const {
    title,
    items,
  } = card;

  return (
    <Card title={title} bordered={false} style={{ width: 200 }}>
      {
        items.map((item) => {
          const {
            quantity,
            productCard: {
              name,
            }
          } = item;
          return (
            <p className="product-item">
              <span>{name}</span>
              <span>{quantity}</span>
            </p>
          )}
        )
      }
    </Card>
  );
}

const changeOrderStatusServer = (status, card) => {
  switch(status) {
    case 'doing':
      socket.emit("orderDoing", card);
      return;
    default:
      return;
  }
}

const ProductListCart = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    socket.emit("pegaProdutos");
    socket.on("retornaProdutos", (data) => {
      setProducts(data);
    })
  });

  return (
    <Row>
      <Col span="18">
        {products.map((product) => {
          const {
            _id,
            name,
            price,
          } = product;
          return (
            <p key={_id}>
              <span>{name}</span>
              <span>R$ {price}</span>
            </p>
          );
        })}
      </Col>
      <Col span="6"></Col>
    </Row>
  );
}

const ControlledBoard = () => {
  const [controlledBoard, setBoard] = useState(board);

  function handleCardMove(_card, source, destination) {
    const {
      toColumnId
    } = destination;

    const orderStatus = board.columns.find((item) => item.id === toColumnId).status;
    changeOrderStatusServer(orderStatus, _card);

    const updatedBoard = moveCard(controlledBoard, source, destination);
    socket.emit("orderDoing", _card);
    setBoard(updatedBoard);
  }

  const handleAddNewOrder = () => {
    const orderCard = {
      title: 'teste josh',
      description: 'Unicorn Tech',
      _id: "6019e91f6fe383c11353a874",
      items: [
        {
          quantity: 2,
          product: "60197b7cb702a68fe3cb2449",
          productCard: {
            name: 'hamburguer'
          },
        }
      ],
      pdvUser: 'josh',
    };
    const updatedBoard = addCard(controlledBoard, {id: 1}, orderCard, {on: 'bottom'});
    socket.emit("orderCreate", orderCard);
    setBoard(updatedBoard);
  }

  const handleUpdateCardFromServer = (data) => {
    // const updatedBoard = moveCard(controlledBoard, source, destination);
    // setBoard(updatedBoard);
  }


  useEffect(() => {
    socket.emit("furflesTeste", {teste: "funciona"});
    socket.on("orderCreateSuccess", (data) => {
      console.info('furfles', data);

    });

    return function cleanup() {
      socket.off("novo_pedido");
    };
  });

  return (
    <>
      <ProductListCart />
      <Button type="primary" onClick={handleAddNewOrder}>Adiciona pedido na mao</Button>
      <div className="board-wrapper">
        <Board
          onCardDragEnd={handleCardMove}
          disableColumnDrag
          renderCard={CustomCard}
        >
          {controlledBoard}
        </Board>
      </div>
    </>
  );
}

export default function Orders() {
  return (
    <div>
      <ControlledBoard />
    </div>
  );
}
