import React from "react";
import millify from "millify";
import { Typography, Row, Col, Statistic } from "antd";
import { useGetCryptosInfQuery } from "../services/cryptoApi";

import { Link } from "react-router-dom";
import Cryptocurrencies from "./Cryptocurrencies";
import News from "./News";
const { Title } = Typography;

export default function Homepage() {
  const { data, isLoading } = useGetCryptosInfQuery();
  const globalState = data?.data?.stats;

  if (isLoading) return "Loaing...";

  return (
    <>
      <Title level={2} className="heading">
        Clobal crypto stats
      </Title>
      <Row>
        <Col span={12}>
          <Statistic value={globalState.total} title="Total Cryptocurrencies" />
        </Col>
        <Col span={12}>
          <Statistic
            value={millify(globalState.totalExchanges)}
            title="Total Exchanges"
          />
        </Col>
        <Col span={12}>
          <Statistic
            value={millify(globalState.totalMarketCap)}
            title="Total Market Cap"
          />
        </Col>
        <Col span={12}>
          <Statistic
            value={millify(globalState.total24hVolume)}
            title="Total 24hVolue"
          />
        </Col>
        <Col span={12}>
          <Statistic
            value={millify(globalState.totalMarkets)}
            title="Total Markets"
          />
        </Col>
      </Row>
      <div className="home-heading-container">
        <Title level={2} className="home-title">
          Top 10 Cryptocurrencies in the world
        </Title>
        <Title level={3} className="show-more">
          <Link to="/cryptocurrencies">Show more</Link>
        </Title>
      </div>
      <Cryptocurrencies simplified />
      <div className="home-heading-container">
        <Title level={2} className="home-title">
          Latest crypto News
        </Title>
        <Title level={3} className="show-more">
          <Link to="/news">Show more</Link>
        </Title>
      </div>
      <News simplified />
    </>
  );
}
