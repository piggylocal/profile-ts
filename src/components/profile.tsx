import IndentedBlock from "./indentedBlock";
import {Link} from "react-router-dom";

const Profile = () => {
    return (
        <main className="center">
            <h1>ZIKAI CHEN</h1>
            <h2>Info</h2>
            <ul className="style-none">
                <li><b>Name: </b>Zikai Chen (陈 子恺, チェン ズカイ)</li>
                <li><b>Birthday: </b>Aug 29, 1998</li>
                <li><b>Email: </b>natnstart@gmail.com</li>
            </ul>
            <h2>Education</h2>
            <ul>
                <li>
                    Graduate School of Information Science and Technology, The University
                    of Tokyo, Master of Information Science and Technology, Apr 2021 -
                    Sept 2023 (Expected)
                </li>
                <li>
                    Department of Computer Science and Technology, Tsinghua University,
                    Bachelor of Engineering, Aug 2016 - June 2020
                </li>
                <li>
                    Changzhou Senior High School of Jiangsu Province, Aug 2013 - June 2016
                </li>
            </ul>
            <h2>Skills</h2>
            <ul>
                <li>
                    <b>Go: </b>1 year of experience. Mainly used in backend development
                    and algorithm competitions.
                </li>
                <li>
                    <b>Python: </b>6 years of experience. Mainly used for machine learning
                    in research and internships. Also used in web development, algorithm
                    competitions, etc.
                </li>
                <li>
                    <b>Java: </b>1 year of experience. Mainly used for Android development
                    in coursework.
                </li>
                <li>
                    <b>C/C++: </b>2 years of experience. Mainly used in various coursework
                    such as GUI development and OS development.
                </li>
                <li>
                    <b>JavaScript: </b>1 year of experience. Used in web development.
                </li>
                <li>
                    <b>Database: </b>Experience with MySQL, MongoDB, and Redis in
                    internships.
                </li>
                <li>
                    <b>Linux: </b>Familiar with basic shell commands and Bash scripts.
                </li>
                <li><b>Cloud: </b>Experience with AWS and GCP in coursework.</li>
                <li>
                    <b>Distributed File System: </b>Having internship experience with
                    HDFS. Familiar with basic Hadoop shell commands.
                </li>
                <li>
                    <b>Machine Learning: </b>Experience with PyTorch, TensorFlow, and
                    Scikit-learn.
                </li>
                <li>
                    <b>Web Development: </b>Experience with React, Express, and Django in various
                    coursework. Experience with KiteX and Thrift in the internship.
                </li>
            </ul>
            <h2>Languages</h2>
            <ul>
                <li><b>English: </b>Business level, TOEFL iBT 112</li>
                <li><b>Japanese: </b>Business level, JLPT N1</li>
                <li><b>Chinese: </b>Native level</li>
            </ul>
            <h2>Internship Experiences</h2>
            <ul>
                <li>
                    <b>ByteDance - Backend Engineer Intern</b><br/>
                    Apr 2022 - Sept 2022<br/>
                    <IndentedBlock>
                        I participated in the backend development of Ocean Engine, China's
                        leading platform that provides integrated marketing and advertising
                        solutions. For development, I used the Go language and the KiteX
                        framework, an RPC framework based on Thrift.
                    </IndentedBlock>
                    <IndentedBlock>
                        I improved an advertisement material service by leveraging caching
                        and concurrency. As a result, the service latency was reduced by
                        over 70%, and the QPS to downstream services decreased by up to 80%.
                    </IndentedBlock>
                    <IndentedBlock>
                        I also developed new services, such as a pre-audit tool for
                        advertising copies on Ocean Engine.
                    </IndentedBlock>
                </li>
                <li>
                    <b>ByteDance - Algorithm Engineer Intern</b><br/>
                    July 2021 - Apr 2022<br/>
                    <IndentedBlock>
                        I developed an automatic soundtracking system for text-to-speech
                        audiobooks. This system could reduce the operating cost of Tomato
                        Novel, China’s leading web novel platform launched by ByteDance.
                    </IndentedBlock>
                    <IndentedBlock>
                        The evaluation result showed that the pass rate for the output
                        soundtracks of the automatic system was 91.25%, only 2.50% behind
                        that of the human system. The automatic system was integrated into
                        the application, and the work was also accepted by INTERSPEECH 2022.
                        Demos are available <Link to="https://acst1223.github.io/interspeech2022/main">here</Link>.
                    </IndentedBlock>
                </li>
                <li>
                    <b>BizSeer AIOps - Research Intern</b><br/>
                    July 2019 - Aug 2019<br/>
                    <IndentedBlock>
                        I did some research on log anomaly detection with RNN networks. The
                        models achieved better F1-score (0.88) than traditional machine
                        learning methods on BGL, an open dataset of logs collected from a
                        BlueGene/L supercomputer system. The code can be
                        found <Link to="https://github.com/acst1223/loglizer">here</Link>.
                    </IndentedBlock>
                </li>
            </ul>
            <h2>Projects</h2>
            <ul>
                <li>
                    <b><Link to="https://wordle-plus.netlify.app/">Wordle+</Link>: </b>A
                    Wordle puzzle game that supports English, Japanese, and Spanish.
                    The puzzle refreshes every hour and its length can be customized. It
                    is a pure frontend project developed with Sass and JavaScript. The
                    source code is made public <Link to="https://github.com/acst1223/wordle_plus">here</Link>.
                </li>
            </ul>
            <h2>Papers</h2>
            <ul>
                <li>
                    <u>Zikai Chen</u>, Tsuruoka Yoshimasa. <b>Prompt-based Fine-tuning
                    for Emotion Recognition in Conversation</b>. NLP2023. First author.
                </li>
                <li>
                    <u>Zikai Chen</u>, Lin Wu, Junjie Pan, Xiang Yin. <b>An Automatic
                    Soundtracking System for Text-to-Speech Audiobooks</b>. INTERSPEECH 2022. First author.
                </li>
                <li>
                    Fei Huang, <u>Zikai Chen</u>, Chen Henry Wu, Qihan Guo, Xiaoyan Zhu,
                    Minlie Huang. <b>NAST: A Non-Autoregressive Generator with Word Alignment for
                    Unsupervised Text Style Transfer</b>. Findings of ACL 2021. Second author.
                </li>
                <li>
                    Yinhe Zheng, <u>Zikai Chen</u>, Rongsheng Zhang, Shilei Huang, Xiao-Xi
                    Mao, Minlie Huang. <b>Stylized Dialogue Response Generation Using Stylized Unpaired
                    Texts</b>. AAAI-21. Co-first author. The code can be
                    found <Link to="https://github.com/silverriver/Stylized_Dialog">here</Link>.
                </li>
            </ul>
        </main>
    )
}

export default Profile;
