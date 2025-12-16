import { extendTheme } from "@chakra-ui/react";
import { ThemeConfig } from "@chakra-ui/react";

// 定义主题配置
const config: ThemeConfig ={
  initialColorMode:'dark' // 设置初始颜色模式为深色
}

// 扩展默认主题
const theme = extendTheme({
  config
})

export default theme