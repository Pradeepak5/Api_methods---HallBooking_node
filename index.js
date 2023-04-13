const express = require('express');
const app = express();
const port = 9000;

app.use(express.json());

const data = [{
    id:'1',
    numberOfSeats:100,
    amenities:["ac","chair","discolights"],
    price:5000,
    ifBooked:"true",
    customerName:"Pradeep",
    date:"13-apr-2023",
    startTime:"13-apr-2023 at 12pm",
    endTime:"14-apr-2023 at 12pm",
    roomId:201,
    roomName:"kaithi"
},
{
    id:'2',
    numberOfSeats:100,
    amenities:["ac","chair","discolights"],
    price:5000,
    ifBooked:"false",
    customerName:"",
    date:"",
    startTime:"",
    endTime:"",
    roomId:202,
    roomName:"rolex"
},
{
    id:'3',
    numberOfSeats:125,
    amenities:["ac","chair","discolights"],
    price:8000,
    ifBooked:"true",
    customerName:"deepak",
    date:"13-apr-2023",
    startTime:"13-apr-2023 at 12pm",
    endTime:"14-apr-2023 at 12pm",
    roomId:203,
    roomName:"leo"
},
{
    id:'4',
    numberOfSeats:50,
    amenities:["ac","chair","discolights"],
    price:2500,
    ifBooked:"false",
    customerName:"",
    date:"",
    startTime:"",
    endTime:"",
    roomId:204,
    roomName:"vikram"
}]

app.get('/',(req,res)=>{
    res.send("Welcome to hall booking")
})

app.get('/all_rooms',(req,res)=>{
    res.send(data);
})

app.get('/all_rooms/available',(req,res)=>{
    if(req.query){
        const {ifBooked} = req.query;
        let availableRooms = data;
        if(ifBooked){
            availableRooms = availableRooms.filter(halls=>halls.ifBooked === ifBooked)
        }
        res.send(availableRooms)
    }else{
        res.send(data);
    }
})

app.post('/all_rooms/new_room',(req,res)=>{
    const newRoomInfo = {
        id:data.length+1,
        numberOfSeats:req.body.numberOfSeats,
        amenities:req.body.amenities,
        price:req.body.price,
        ifBooked:req.body.ifBooked,
        customerName:req.body.customerName,
        date:req.body.date,
        startTime:req.body.startTime,
        endTime:req.body.endTime,
        roomId:req.body.roomId,
        roomName:req.body.roomName
    }
    data.push(newRoomInfo);
    res.send(data)
})

app.put('/rooms/available/:id',(req,res)=>{
    const {id} = req.params;
    const halls = data.find(hall=>hall.id == id);

    if(halls.ifBooked == "true"){
        res.send('The room you looking for is already booked');
    }else{
        halls.ifBooked="true";
        halls.customerName=req.body.customerName;
        halls.date=req.body.date;
        halls.startTime=req.body.startTime;
        halls.endTime=req.body.endTime;
        res.send(data);
    }
})

app.listen(port,()=>console.log(`server connected in the port : ${port}`));