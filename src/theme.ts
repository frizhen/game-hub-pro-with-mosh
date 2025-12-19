import { extendTheme } from "@chakra-ui/react";
import { ThemeConfig } from "@chakra-ui/react";

// 定义主题配置
const config: ThemeConfig ={
  initialColorMode:'dark' // 设置初始颜色模式为深色
}

// 扩展默认主题
const theme = extendTheme({
  config,
  colors:{
    gray:{
      50:'#f2f2f2',
      100:'#d9d9d9',
      200:'#bfbfbf',
      300: 'b3b3b3',
      400: 'a0a0a0',
      500: '898989',
      600: '636363',
      700: '202020',
      800: '121212',
      900: '111111'
    }
  }
})

export default theme