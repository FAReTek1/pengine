%define PEN_DU pen_down; pen_up;


# -- small utilities --
proc fill_outline res, th {
    local angle = 0;
    repeat $res {
        change_xy $th * sin(angle),
                  $th * cos(angle);
        stamp;
        change_xy -$th * sin(angle),
                  -$th * cos(angle);
        angle += 360 / $res;
    }
}

proc stamp_shadow dx, dy, ghost {
    change_xy $dx, $dy; change_ghost_effect $ghost;
    stamp;
    change_xy -$dx, -$dy; change_ghost_effect -$ghost;
}
