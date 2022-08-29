import React, { useEffect, useLayoutEffect, useState } from "react";
import millify from "millify";
import { Card, Row, Col, Input } from "antd";

import { useGetCryptosQuery } from "../services/cryptoApi";
import { Link } from "react-router-dom";

export default function Cryptocurrencies({ simplified }) {
  const count = simplified ? 10 : 100;
  const { data: cryptosList, isLoading } = useGetCryptosQuery(count);
  const [cryptos, setCryptos] = useState([]);
  const [searchTherm, setSearchTherm] = useState("");

  useEffect(() => {
    const filteredData = cryptosList?.data?.coins.filter((coin) =>
      coin.name.toLowerCase().includes(searchTherm.toLowerCase())
    );
    setCryptos(filteredData);
  }, [cryptosList, searchTherm]);

  if (isLoading) return "Loading...";

  return (
    <>
      {!simplified && (
        <div className="search-ctypto">
          <Input
            placeholder="Search cryptocurrency"
            onChange={(e) => {
              setSearchTherm(e.target.value);
            }}
          ></Input>
        </div>
      )}

      <Row gutter={[32, 32]} className="crypto-card-container">
        {cryptos &&
          cryptos.map((currency) => (
            <Col
              xs={24}
              sm={12}
              lg={6}
              className="crypto-card"
              key={currency.id}
            >
              <Link to={`/crypto/${currency.uuid}`}>
                <Card
                  hoverable
                  title={`${currency.rank}. ${currency.name}`}
                  extra={
                    <img className="crypto-image" src={currency.iconUrl} />
                  }
                >
                  <p>Price: {millify(currency.price)}</p>
                  <p>Market Cap: {millify(currency.marketCap)}</p>
                  <p>Daily change: {millify(currency.change)}%</p>
                </Card>
              </Link>
            </Col>
          ))}
      </Row>
    </>
  );
}
