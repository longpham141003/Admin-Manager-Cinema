const seatConfig = {
  minSeatTypes: 3, 
  vipSeats: {
      rows: [3, 4],  
      columns: [3, 8] 
  },
  lastRowSeat: {
      maxColumn: 10, 
      oddColumn: true 
  },
  defaultSeatType: 0, 
  vipSeatType: 1,     
  lastRowSeatType: 2 
};

export default seatConfig;
