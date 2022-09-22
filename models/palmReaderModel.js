const mongoose = require('mongoose')

const palmReaderSchema = new mongoose.Schema({
    // subAdmin:{
    //     type: mongoose.Schema.Types.ObjectId,
    //     required: true,
    //     ref: 'admin'
    // },

    heartLineReading: {      //future of love life
        heartLineDiscription: { type: String, trim: true },
        DesignOfLine: { type: String, enum: ["lineOutSide", "betweenIndex", "belowMiddle", "belowTheBase", "belowTheIndex", "curvesDownward", "commenceWithFork"] },
        // lineOutSide: heart line begins just outside the base of the index finger
        // betweenIndex: heart line begins between the index and middle finger
        // belowMiddle: heart line begins below the middle finger
        // belowTheBase: heart line begins a bit below the base of the middle finger
        // belowTheIndex: heart line begins  below the index finger
        // curvesDownward: heart line curves downward near the base of the index finger
        // commenceWithFork: heart line commences with a fork, one branch below the index finger and the other between the index and middle finger
        clickImage: { type: String, /*required: true,*/ },
        finalResult: { type: String, trim: true }
    },

    headLineReading: {    //whick kind of person you are
        headLineDiscription: { type: String, trim: true },
        DesignOfLine: { type: String, enum: ["beginFromInside", "joinedAndStraight", "joinedAndForked", "joinedAndBendsDownward", "joinedAndBendsTooFarDownward", "joinedAndCurved", "seperateBothLine", "seperateBothLineAndDownward", "DoubleHeadLine"] },
        // beginFromInside: head line begins from inside the life line
        // joinedAndStraight: head line is joined to the life line and runs straight across the palm
        // joinedAndForked: head line is joined to the life line and forks
        // joinedAndBendsDownward: head line is joined to the life line and bends downward
        // joinedAndBendsTooFarDownward: head line is joined to the life line and bends too far downward
        // joinedAndCurved: head line is joined to the life line , bends down and then turns with a curve
        // seperateBothLine: head line is separate and above the life line
        // seperateBothLineAndDownward: head line is separate and above the life line and the head line curves slightly downward
        // DoubleHeadLine: head line is double and above the life line
        clickImage: { type: String, /*required: true,*/ },
        finalResult: { type: String, trim: true }
    },

    lifeLineReading: {
        lifeLineDiscription: { type: String, trim: true },
        DesignOfLine: { type: String, enum: ["straight", "short", "crossingThePalm", "rounded"] },
        // straight: life line is straight
        // short: life line is short
        // crossingThePalm: life line crosses the palm
        // rounded: life line is rounded
        clickImage: { type: String, /*required: true,*/ },
        finalResult: { type: String, trim: true }
    },

    fateLineReading: {    //it tells about your career,work, struggle, success
        fateLineDiscription: { type: String, trim: true },
        DesignOfLine: { type: String, enum: ["beginAtMiddle", "endAtHeartLine", "towardsTheHeadLine", "noFateLine", "lineWithBranches", "crossedByAnotherLine", "mountOfMoon", "beginFromLifeLine", "brokenFateLine", "cutByHorizontalLine"] },
        // beginAtMiddle: fate line begins at the middle of the wrist and ends at the mount of saturn
        // endAtHeartLine: fate line ends at the heart line
        // towardsTheHeadLine: fate line runs towards the head line
        // noFateLine: no fate line
        // lineWithBranches: fate line with branches
        // crossedByAnotherLine: fate line is accompanied by another parallel line
        // mountOfMoon: fate line beginning from the mount of moon
        // beginFromLifeLine: fate line begins from the life line
        // brokenFateLine: fate line is broken
        // cutByHorizontalLine: fate line is cut by horizontal lines
        clickImage: { type: String, /*required: true,*/ },
        finalResult: { type: String, trim: true }
    },

    marriageLineReading: {
        marriageLineDiscription: { type: String, trim: true },
        DesignOfLine: { type: String, enum: ["straightAndClear", "clearButBreak", "curvesDownward", "curvesUpward", "droppingLines", "islandAtBeginningOfLine", "", "islandAtMiddleOfLine", "islandAtEndOfLine", "manyIsland", "forkedLines", "forkedAndDownward", "joinUpward"] },
        // straightAndClear: marriage line is straight and clear without any breaks
        // clearButBreak: marriage line is straight and clear with a break in between
        // curvesDownward: marriage line curves downward
        // curvesUpward: marriage line curves upward
        // droppingLines: clear line with lots of little dropping lines
        // islandAtBeginningOfLine: there is an island at the beginning of the line
        // islandAtMiddleOfLine: there is an island at the middle of the line
        // islandAtEndOfLine: there is an island at the end of the line
        // manyIsland: there are many islands in the line(like a chain)
        // forkedLines: the line is forked
        // forkedAndDownward: the line is forked and turns downward towards the heart line
        // joinUpward: the line goes into the hand and joins upward with the line of sun
        clickImage: { type: String, /*required: true,*/ },
        finalResult: { type: String, trim: true }
    },

    isDeleted: {
        type: Boolean,
        default: false
    },
    deletedAt: {
        type: Date
    }
}, { timestamps: true });

module.exports = mongoose.model('palmReader', palmReaderSchema);
