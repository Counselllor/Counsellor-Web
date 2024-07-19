import internships from "./internship.json"
import React, {useEffect, useState} from "react";
import Navbar from "../Navbar/Navbar.jsx";
import JobsData from "../jobs/jobs.json";
import Footer from "../Footer/Footer.jsx";
import "../jobs/Jobs.css"
import "./internship.css"
import ReactPaginate from "react-paginate";

export function Internship(){
    const [currentItems, setCurrentItems] = useState([])
    const [pageSummary, setPageSummary] = useState("")



    return(
        <>
            <div className="jobsPage">
                <Navbar />
                <header className="jobsPage-header">
                    <h1 className="jobsPage-main-title">Available Internship</h1>
                    <p className="jobsPage-subtitle">{pageSummary}</p>
                </header>
                <section className="jobsPage-content" style={{zIndex:10}}>
                    <div className="jobsPage-list">
                        {currentItems.map((item,index) => (
                            <div className="BoxContent" key={index}>
                                <img className="ApiImg" key={index} src={item.image} alt="" />
                                <h2 className="InternTitle" >
                                    {item.internship_name}
                                </h2>
                                <div className="time">
                                    <div className="mode">{item.mode}</div>
                                    <div className="duration">{item.duration}</div>
                                </div>
                                <p className="desc">{item.description}</p>

                                <button
                                    className="viewMore"
                                    id="btn"
                                    style={{ cursor: "none" }}
                                    onClick={() => {
                                        window.open(item.link);
                                    }}>
                                    Apply Now
                                </button>
                            </div>
                        ))}
                    </div>
                    <PaginatedItem setPageSummary={setPageSummary} setCurrentItems={setCurrentItems}/>
                </section>
            </div>
                <Footer />
        </>
    )
}

function PaginatedItem({setCurrentItems,setPageSummary}){
    const itemsPerPage = 12

    const pageCount = Math.ceil(internships.length / itemsPerPage)
    function handlePageClick(event){
        const newOffset = (event.selected * itemsPerPage) % internships.length
        const endOffset = newOffset + itemsPerPage > internships.length ? internships.length : newOffset + itemsPerPage
        setCurrentItems(internships.slice(newOffset, endOffset))
        setPageSummary(`Showing ${newOffset+1} to ${endOffset} results out of ${internships.length}`)
    }

    useEffect(()=>{
        handlePageClick({selected : 0})
    },[])

    return(
        <>
            <div className="pagination-wrapper">
                <ReactPaginate
                    breakLabel="..."
                    nextLabel="Next > "
                    previousLabel=" < Previous"
                    onPageChange={handlePageClick}
                    pageRangeDisplayed={1}
                    marginPagesDisplayed={1}
                    pageCount={pageCount}
                    renderOnZeroPageCount={null}
                    activeClassName="page-btn"
                    activeLinkClassName='active'
                    containerClassName='pagination-container'
                    pageClassName='page-btn'
                    pageLinkClassName='page-btn-link'
                    previousClassName='page-btn'
                    previousLinkClassName='prev page-btn-link'
                    nextClassName='page-btn'
                    nextLinkClassName='next page-btn-link'
                    disabledClassName='page-btn'
                    disabledLinkClassName='disabled page-btn-link'
                    breakClassName='page-btn'
                    breakLinkClassName='break page-btn-link'
                />
            </div>
        </>
    )
}