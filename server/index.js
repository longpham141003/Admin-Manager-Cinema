import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import userRoute from './routes/user/user.routes.js';
import movieRoute from './routes/movie/movie.routes.js';
import theaterRoute from './routes/theater/theater.routes.js'; // Thêm dòng này
import seatRoute from './routes/seat/seat.routes.js';
import bookingRoute from './routes/ticket/booking.routes.js';
import seatTypeRoutes from './routes/seat/seatType.routes.js';
import showtimeRoute from './routes/showtime/showtime.routes.js';
import snackRoute from './routes/snack/snack.routes.js';

dotenv.config(); // Sử dụng dotenv để đọc file .env

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/api/uploads', express.static('uploads'));

app.use('/api/users', userRoute);
app.use('/api/movies', movieRoute);
app.use('/api/theaters', theaterRoute);
app.use('/api/showtimes', showtimeRoute);
app.use('/api/seats', seatRoute);
app.use('/api/seattypes', seatTypeRoutes);
app.use('/api/bookings', bookingRoute);
app.use('/api/snacks', snackRoute); 

app.get('/', (req, res) => {
    res.send('Hello from Node API Server Updated');
});

// Kết nối MongoDB
mongoose.connect('mongodb+srv://longpham141003:Q.long2003@cluster0.wnvq1lm.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
    .then(() => {
        console.log('Đã kết nối tới Database');
        app.listen(3000, () => {
            console.log('Server is listening on port 3000');
        });
    })
    .catch((err) => {
        console.error('Không thể kết nối tới Database', err);
    });
