import { useState } from "react";
import { Layout, Row, Col } from "antd/lib";
import Chart from "../components/Chart";
import SwapInterface from "../components/SwapInterface";
import TransactionHistory from "../components/TransactionHistory";
import { v4 as uuidv4 } from "uuid";
const { Header, Content } = Layout;

type Transaction = {
    id: string;
    transactionHash: string;
    amountToBuyUsdc: number;
    slippage: number;
    status: "success" | "failed";
    timestamp: string;
    quote: {
        inAmount: string;
        slippageBps: number;
    };
};

export default function Home() {
    const [transactions, setTransactions] = useState<Transaction[]>([]);

    const handleSwapSuccess = (transaction: Transaction) => {
        const uuid = uuidv4();
        const newTransaction: Transaction = {
            id: uuid,
            transactionHash: transaction.transactionHash ?? uuid,
            amountToBuyUsdc: parseFloat(transaction.quote.inAmount) / 1e9,
            slippage: transaction.quote.slippageBps / 100,
            status: "success",
            timestamp: new Date().toLocaleString(),
            quote: transaction.quote,
        };
        setTransactions([...transactions, newTransaction]);
    };

    return (
        <Layout style={{ minHeight: "100vh", backgroundColor: "#1C1C1C" }}>
            <Header
                style={{
                    backgroundColor: "#1C1C1C",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <h1 style={{ color: "#E0E0E0", margin: 0 }}>
                    JUP/USDC Simulator
                </h1>
            </Header>
            <Content style={{ padding: "24px 48px" }}>
                <Row gutter={[24, 24]} justify="center">
                    <Col xs={24} lg={16}>
                        <Chart />
                    </Col>
                    <Col xs={24} lg={8}>
                        <SwapInterface onSwapSuccess={handleSwapSuccess} />
                    </Col>
                    <Col xs={24}>
                        <TransactionHistory transactions={transactions} />
                    </Col>
                </Row>
            </Content>
        </Layout>
    );
}
