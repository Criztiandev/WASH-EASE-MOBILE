import { View } from "react-native";
import SearchIcon from "../../assets/icons/search_icon.svg";
import CloseIcon from "../../assets/icons/close_icon.svg";
import Input from "../atoms/Input";

const SearchBar = () => {
  return (
    <View className="border rounded-[5px] flex-row justify-start items-center px-4 bg-white">
      <SearchIcon />
      <Input variant={"ghostsdfsd"} className={" flex-1 overflow-hidden"} />
      <CloseIcon />
    </View>
  );
};

export default SearchBar;
