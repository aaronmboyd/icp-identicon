# icp-identicon

This is a simple Typescript Express project that is an identicon generator using the caller principal, and optionally a salted (with ic.time()) identicon (should be mostly unique).

Minimally viable ICP project just to test out a minimally functional Azle project with no stable storage, using a basic Express server setup.

## Usage

```bash
npm install
dfx deploy
```

Then view the routes in your browser
* `/identicon`
* `/salty-identicon`

![image](https://github.com/aaronmboyd/icp-identicon/assets/13218496/4e3949f5-ed18-4203-b521-3a46cae278da)
