FROM node:22-alpine
WORKDIR /app
COPY backend/package*.json ./backend/
RUN npm --prefix backend install --omit=dev
COPY backend ./backend
COPY frontend ./frontend
ENV NODE_ENV=production
ENV PORT=3000
EXPOSE 3000
CMD ["npm", "--prefix", "backend", "start"]
