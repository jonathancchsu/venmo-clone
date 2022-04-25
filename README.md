# **Venmo Clone**

Welcome to the **[Venmo Clone](https://venmo-clone.herokuapp.com/)** repo, this is a clone of **[Venmo](https://venmo.com/)**. **Venmo Clone** is a web application that allows you to transfer money and share those transaction history with friends. Venmo Clone offers a variety of functions that allows users to interact with each other by sending and receiving payments, as well as requesting payments and commenting on other's payments.

# Table of Content

- [Technologies Used](#techonologies-used)
- [Link to Live Site](#link-to-live-site)
- [Index](#index)
- [Getting Started](#getting-started)
   - [For M1 Users](#dev-containers-for-m1-uers)
   - [Standard](#standard-traditional)
- [Screenshots of Usage](#screenshots-of-usage)
- [Code Snippets](#code-snippets)

# Techonologies Used
<img src="https://camo.githubusercontent.com/442c452cb73752bb1914ce03fce2017056d651a2099696b8594ddf5ccc74825e/68747470733a2f2f63646e2e6a7364656c6976722e6e65742f67682f64657669636f6e732f64657669636f6e2f69636f6e732f6a6176617363726970742f6a6176617363726970742d6f726967696e616c2e737667" alt="drawing" width="50"/> <img src="https://camo.githubusercontent.com/27d0b117da00485c56d69aef0fa310a3f8a07abecc8aa15fa38c8b78526c60ac/68747470733a2f2f63646e2e6a7364656c6976722e6e65742f67682f64657669636f6e732f64657669636f6e2f69636f6e732f72656163742f72656163742d6f726967696e616c2e737667" alt="react" width="50"> 
<img src="https://camo.githubusercontent.com/2b6b50702c658cdfcf440cef1eb88c7e0e5a16ce0eb6ab8bc933da7697c12213/68747470733a2f2f63646e2e6a7364656c6976722e6e65742f67682f64657669636f6e732f64657669636f6e2f69636f6e732f72656475782f72656475782d6f726967696e616c2e737667" alt="redux" width="50"> 
<img src="https://www.pngall.com/wp-content/uploads/5/Python-PNG.png" alt="python" width ="50"> 
<img src="https://user-images.githubusercontent.com/92463844/162601723-beb79065-3555-4c2d-86c1-37d914e6d7ae.png" alt="flask" width ="50"> 
<img src="https://camo.githubusercontent.com/d536b9cc0c533324368535ece721f5424f28eae3ec0e6f3847408948ecacfce6/68747470733a2f2f63646e2e6a7364656c6976722e6e65742f67682f64657669636f6e732f64657669636f6e2f69636f6e732f706f737467726573716c2f706f737467726573716c2d6f726967696e616c2e737667" alt="postgreSQL" width="50">
<img src="https://camo.githubusercontent.com/2e496d4bfc6f753ddca87b521ce95c88219f77800212ffa6d4401ad368c82170/68747470733a2f2f63646e2e6a7364656c6976722e6e65742f67682f64657669636f6e732f64657669636f6e2f69636f6e732f637373332f637373332d6f726967696e616c2e737667" alt="css3" width="50"> 
<img src="https://camo.githubusercontent.com/da7acacadecf91d6dc02efcd2be086bb6d78ddff19a1b7a0ab2755a6fda8b1e9/68747470733a2f2f63646e2e6a7364656c6976722e6e65742f67682f64657669636f6e732f64657669636f6e2f69636f6e732f68746d6c352f68746d6c352d6f726967696e616c2e737667" alt="html5" width="50"> 
<img src="https://camo.githubusercontent.com/dc9e7e657b4cd5ba7d819d1a9ce61434bd0ddbb94287d7476b186bd783b62279/68747470733a2f2f63646e2e6a7364656c6976722e6e65742f67682f64657669636f6e732f64657669636f6e2f69636f6e732f6769742f6769742d6f726967696e616c2e737667" alt="git" width="50"> 
<img src="https://camo.githubusercontent.com/5fa137d222dde7b69acd22c6572a065ce3656e6ffa1f5e88c1b5c7a935af3cc6/68747470733a2f2f63646e2e6a7364656c6976722e6e65742f67682f64657669636f6e732f64657669636f6e2f69636f6e732f7673636f64652f7673636f64652d6f726967696e616c2e737667" alt="vscode" width="50"> 
<img
src="https://www.docker.com/wp-content/uploads/2022/03/vertical-logo-monochromatic.png" alt="docker" width="50">


# Link to Live Site

### **[Venmo Clone](https://venmo-clone.herokuapp.com/)**


# Index
[Feature List](https://github.com/jonathancchsu/venmo-clone/wiki/Feature-List) | [Database Schema](https://github.com/jonathancchsu/venmo-clone/wiki/Database-Schema) | [User Stories](https://github.com/jonathancchsu/venmo-clone/wiki/User-Stories) | [Wireframes](https://github.com/jonathancchsu/venmo-clone/wiki/Wireframes)


# Getting Started
## Installing the application (2 ways)
### Dev Containers (for M1 uers)

1. Make sure you have the [Microsoft Remote - Containers](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers) extension installed.
2. Make sure you have [Docker](https://www.docker.com/products/docker-desktop/) installed on your computer.
3. Clone the repository (only this branch)
   ```bash
   git clone https://github.com/jonathancchsu/slack-clone-repo.git
   ```
4. Open the repo in VS Code.
5. Click "Open in Container" when VS Code prompts to open container in the bottom right hand corner.
6. **Be Patient!** The initial install will take a LONG time, it's building a container that has postgres preconfigured and even installing all your project dependencies. (For both flask and react!)

   **Note:** This will take much less time on future starts because everything will be cached.

7. Once everything is up, be sure to make a `.env` file based on `.env.example` in both the root directory and the *react-app* directory before running your app.

8. Get into your pipenv, migrate your database, seed your database, and run your flask app

   ```bash
   pipenv shell
   ```

   ```bash
   flask db upgrade
   ```

   ```bash
   flask seed all
   ```

   ```bash
   flask run
   ```

9. To run the React App, install the dependencies in the `react-app` folder and run the application.

   ```bash
   npm install
   ```

   ```bash
   npm start
   ```
10. The application will start at [http://localhost:3000/](http://localhost:3000/).

### Standard (Traditional)

1. Clone this repository (only this branch)

   ```bash
   git clone https://github.com/jonathancchsu/slack-clone-repo.git
   ```

2. Install dependencies

      ```bash
      pipenv install --dev -r dev-requirements.txt && pipenv install -r requirements.txt
      ```

3. Create a **.env** file based on the example with proper settings for your
   development environment
4. Setup your PostgreSQL user, password and database and make sure it matches your **.env** file

5. Get into your pipenv, migrate your database, seed your database, and run your flask app

   ```bash
   pipenv shell
   ```

   ```bash
   flask db upgrade
   ```

   ```bash
   flask seed all
   ```

   ```bash
   flask run
   ```

6. To run the React App, install the dependencies in the `react-app` folder and run the application.

   ```bash
   npm install
   ```

   ```bash
   npm start
   ```
7. The application will start at [http://localhost:3000/](http://localhost:3000/).

# Screenshots of Usage
### Splash Page
![Screen Shot 2022-04-25 at 6 07 57 AM](https://user-images.githubusercontent.com/92463844/165070571-d0d6160a-975b-4465-8329-ccecc1caeddb.png)
### Sign In Page
![Screen Shot 2022-04-25 at 6 08 02 AM](https://user-images.githubusercontent.com/92463844/165070581-63149467-bc4d-4129-9ee1-e1b9202c8b8e.png)
### Sign Up Page
![Screen Shot 2022-04-25 at 6 08 15 AM](https://user-images.githubusercontent.com/92463844/165070597-bbe4b82b-dda4-4ae9-8f3d-98e9fab0930a.png)
### Home Page
![Screen Shot 2022-04-25 at 6 08 21 AM](https://user-images.githubusercontent.com/92463844/165070607-a5a4de02-d18a-459c-8812-1f9080e4ac6c.png)
### One Payment Page
![Screen Shot 2022-04-25 at 6 08 34 AM](https://user-images.githubusercontent.com/92463844/165070616-91c19479-0a0f-47e8-924c-2e76340cad15.png)
### Incomplete payment Page
![Screen Shot 2022-04-25 at 6 08 38 AM](https://user-images.githubusercontent.com/92463844/165070628-8e5f5fd2-e82c-44b0-8f84-749a9ca6e0ba.png)
### Notifications Page
![Screen Shot 2022-04-25 at 6 08 41 AM](https://user-images.githubusercontent.com/92463844/165070634-69a06f19-4edc-45a5-be83-afcb4865a82b.png)
### Payment Form Page
![Screen Shot 2022-04-25 at 6 08 46 AM](https://user-images.githubusercontent.com/92463844/165070642-558c7795-d4d7-4bca-9c7b-2cd07b5e57ae.png)

# Code Snippets
One of the core functions of this web application is to send money to each other. Therefore, to make this trasaction fast and efficient, there is one function call, posting payment api, that would automatically deduct the funds of payment sender and add the funds to the payment receiver. 

  ```bash
  if request.method == 'POST':
    data = request.json
    form = RequestForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
      payment = Payment (
        amount=data['amount'],
        sender_id=data['sender_id'],
        receiver_id=data['receiver_id'],
        title=data['title'],
        privacy=data['privacy'],
      )
      db.session.add(payment)
      db.session.commit()

      receiver = User.query.get(payment.receiver_id)
      new_receiver_balance = round(float(receiver.balance) + float(data['amount']), 2)
      receiver.balance = new_receiver_balance
      db.session.commit()

      sender = User.query.get(payment.sender_id)
      new_sender_balance = round(float(sender.balance) - float(data['amount']), 2)
      sender.balance = new_sender_balance
      db.session.commit()
      return payment.to_dict()
   ```

