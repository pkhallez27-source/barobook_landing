import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    //  CORS 오류를 해결하기 위해서 프록시 서버 사용 설정
    proxy: {
      //  리액트 내부에서 사용할 접속 주소를 입력
      '/api': {
        //  실제 접속할 서버의 주소 입력
        // target: 'http://barobook.kro.kr',
        target: 'http://localhost:8080',
        //  CORS 해결 설정, true = 사용, false = 미사용
        changeOrigin: true,
        //  프록시 서버에서 사용할 URL 경로를 입력
        //  실제 서버의 URL과 프록시 서버에서 사용하는 주소가 달라지기 대문에 해당 주소를 변경하여 서버 접속
        // rewrite: (path) => path.replace(/^\/api/, ''),
      }
    }
  },
})
