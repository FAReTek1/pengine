%include backpack/pengine/pengine

costumes "blank.svg";

onflag {
    setup;
    forever{tick;}
}

func circle_from_pos(pos p) Circle {
    return Circle{x: $p.x, y: $p.y, r: $p.s};
}

proc setup{
    hide;
}

proc tick{
    erase_all;
    RESET_POS;
    draw_crescent circle_from_pos(my_pos()), Circle{
        x: mouse_x(), y: mouse_y(), r: 50
    }, 30;
}
