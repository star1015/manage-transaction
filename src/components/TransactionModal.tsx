import React from 'react';
import { Form, Input, Button, Select, Modal } from 'antd';
import { TransactionItem } from '../types/transaction';

// Form - Layout
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

// Interface Props and States
interface IProps {
  showModal: () => void;
  handleSubmit: (item: TransactionItem) => void;
  visible: boolean;
}

class TransactionModal extends React.Component<IProps, {}> {

  onFinish = (values: any) => {
      const { handleSubmit } = this.props;

      // Create New Item
      const item: TransactionItem = {
          key: (new Date()).toISOString(),
        creationDate: (new Date()).toISOString(),
        payDate: "",
        state: values.state,
        payedToId: "",
        fiat: {
            amount: values.fiat_amount,
            currency: values.fiat_currency
        },
        crypto: {
            amount: values.crypto_amount,
            currency: values.crypto_currency
        }
      };

      handleSubmit(item);
  }
  render() {
    const { showModal, visible } = this.props;

    return (
      <>
        <Modal
          visible={visible}
          title="Title"
          onCancel={showModal}
          footer={false}
        >
          <Form {...layout} name="control-ref" onFinish={this.onFinish}>
            {/* state */}
            <Form.Item
              name="state"
              label="State"
              rules={[{ required: true, message: "Select the state!" }]}
            >
              <Select>
                <Select.Option value="PS_RUNNING">PS_RUNNING</Select.Option>
                <Select.Option value="PS_FINISHED">PS_FINISHED</Select.Option>
                <Select.Option value="PS_ABORTED">PS_ABORTED</Select.Option>
              </Select>
            </Form.Item>

            {/* Fiat - Amount */}
            <Form.Item
              name="fiat_amount"
              label="Fiat amount"
              rules={[{ required: true, message: "Input the amount!" }]}
            >
              <Input
                type="number"
                name="amount"
                id="fiat"
              ></Input>
            </Form.Item>

            {/* Fiat - Currency */}
            <Form.Item
              name="fiat_currency"
              label="Fiat currency"
              rules={[{ required: true, message: "Select the currency!" }]}
            >
              <Select>
                <Select.Option value="FC_EURO">FC_EURO</Select.Option>
                <Select.Option value="FC_USDOLLAR">FC_USDOLLAR</Select.Option>
              </Select>
            </Form.Item>

            {/* Crypto - Amount */}
            <Form.Item
              name="crypto_amount"
              label="Crypto amount"
              rules={[{ required: true, message: "Input the amount!" }]}
            >
              <Input
                type="number"
                name="amount"
                id="crypto"
              ></Input>
            </Form.Item>

            {/* Crypto - Currency */}
            <Form.Item
              name="crypto_currency"
              label="Crypto currency"
              rules={[{ required: true, message: "Select the currency!" }]}
            >
              <Select>
                <Select.Option value="CC_BITCOIN">CC_BITCOIN</Select.Option>
                <Select.Option value="CC_DASH">CC_DASH</Select.Option>
              </Select>
            </Form.Item>

            {/* Buttons */}
            <Form.Item {...tailLayout}>
              <Button
                type="primary"
                htmlType="submit"
              >
                Submit
              </Button>
              <Button type="default" onClick={showModal}>
                Cancel
              </Button>
            </Form.Item>
          </Form>
        </Modal>
      </>
    );
  }
}

export default TransactionModal;
