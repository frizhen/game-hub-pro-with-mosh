import { InputGroup, InputLeftElement, Input } from "@chakra-ui/react";
import { useRef } from "react";
import { BsSearch } from "react-icons/bs";
import useGameQueryStore from "../store";

const SearchInput = () => {
  const setSearchText = useGameQueryStore((s) => s.setSearchText);
  const inputRef = useRef<HTMLInputElement>(null);
  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        if (inputRef.current) setSearchText(inputRef.current.value);
      }}
    >
      <InputGroup>
        <InputLeftElement children={<BsSearch />} />
        <Input
          ref={inputRef}
          borderRadius={20}
          placeholder="search games..."
          variant="filler"
        />
      </InputGroup>
    </form>
  );
};

export default SearchInput;
