import inquirer from "inquirer";

/**
 *
 */
const StationsToInquirer = async () => {
  const foo = await inquirer.prompt([
    {
      name: "foobar",
      description: "lol"
    },
    {
      name: "hey"
    }
  ]);

  console.log(foo);
};

export default StationsToInquirer;
