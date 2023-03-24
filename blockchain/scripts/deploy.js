

async function main() {
  const Warranty = await ethers.getContractFactory("Warranty");

  // Start deployment, returning a promise that resolves to a contract object
  const warranty = await Warranty.deploy();   
  console.log("Contract deployed to address:", warranty.address);
}

main()
 .then(() => process.exit(0))
 .catch(error => {
   console.error(error);
   process.exit(1);
 });