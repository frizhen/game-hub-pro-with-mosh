import { Button, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";
import { BsChevronDown } from "react-icons/bs";

const SortSelector = () => {
  return (
    <Menu>
      <MenuButton as={Button} rightIcon={<BsChevronDown />}>
        order by: relevance
      </MenuButton>
      <MenuList>
        <MenuItem>relevance</MenuItem>
        <MenuItem>date added</MenuItem>
        <MenuItem>name</MenuItem>
        <MenuItem>release date</MenuItem>
        <MenuItem>popularity</MenuItem>
        <MenuItem>average rating</MenuItem>
      </MenuList>
    </Menu>
  );
};

export default SortSelector;
