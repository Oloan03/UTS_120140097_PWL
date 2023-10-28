import React, { Component } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      products: [
        { id: 1, name: 'Produk 1', price: 10, quantity: 0 },
        { id: 2, name: 'Produk 2', price: 20, quantity: 0 },
        { id: 3, name: 'Produk 3', price: 30, quantity: 0 },
      ],
      showAddModal: false,
      newProduct: {
        name: '',
        price: '',
      },
      cart: [],
    };
  }

  handleShowAddModal = () => {
    this.setState({ showAddModal: true });
  };

  handleCloseAddModal = () => {
    this.setState({ showAddModal: false });
  };

  handleAddProduct = () => {
    // Validasi input
    if (!this.state.newProduct.name || !this.state.newProduct.price) {
      alert('Silakan isi semua field');
      return;
    }

    const newProducts = [...this.state.products];
    newProducts.push({
      id: newProducts.length + 1,
      name: this.state.newProduct.name,
      price: parseFloat(this.state.newProduct.price),
      quantity: 0,
    });

    this.setState({
      products: newProducts,
      newProduct: { name: '', price: '' },
      showAddModal: false,
    });
  };

  handleInputChange = (e) => {
    const { name, value } = e.target;
    this.setState((prevState) => ({
      newProduct: {
        ...prevState.newProduct,
        [name]: value,
      },
    }));
  };

  handleDeleteProduct = (productId) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus produk ini?')) {
      const updatedProducts = this.state.products.filter((product) => product.id !== productId);
      this.setState({ products: updatedProducts });
    }
  };

  handleAddToCart = (productId) => {
    const productToAdd = this.state.products.find((product) => product.id === productId);
    if (productToAdd) {
      const updatedCart = [...this.state.cart, productToAdd];
      this.setState({ cart: updatedCart });
    }
  };

  handleRemoveFromCart = (productId) => {
    const updatedCart = this.state.cart.filter((product) => product.id !== productId);
    this.setState({ cart: updatedCart });
  };

  render() {
    return (
      <div className="App">
        <h1>Daftar Produk</h1>
        <Button variant="success" onClick={this.handleShowAddModal}>Tambah Produk</Button>

        <ul>
          {this.state.products.map((product) => (
            <li key={product.id}>
              <h3>{product.name}</h3>
              <p>Harga: ${product.price}</p>
              <p>Jumlah: {product.quantity}</p>
              <Button
                variant="danger"
                onClick={() => this.handleDeleteProduct(product.id)}
              >
                Hapus
              </Button>
              <Button
                variant="primary"
                onClick={() => this.handleAddToCart(product.id)}
              >
                Beli
              </Button>
            </li>
          ))}
        </ul>

        <div>
          <h2>Keranjang Belanja</h2>
          <ul>
            {this.state.cart.map((product) => (
              <li key={product.id}>
                <h3>{product.name}</h3>
                <p>Harga: ${product.price}</p>
                <Button
                  variant="danger"
                  onClick={() => this.handleRemoveFromCart(product.id)}
                >
                  Hapus dari Keranjang
                </Button>
              </li>
            ))}
          </ul>
        </div>

        <Modal show={this.state.showAddModal} onHide={this.handleCloseAddModal}>
          <Modal.Header closeButton>
            <Modal.Title>Tambah Produk</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group>
                <Form.Label>Nama Produk</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  value={this.state.newProduct.name}
                  onChange={this.handleInputChange}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Harga</Form.Label>
                <Form.Control
                  type="number"
                  name="price"
                  value={this.state.newProduct.price}
                  onChange={this.handleInputChange}
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.handleCloseAddModal}>Batal</Button>
            <Button variant="primary" onClick={this.handleAddProduct}>Simpan</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

export default App;
