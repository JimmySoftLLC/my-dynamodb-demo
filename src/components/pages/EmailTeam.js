import React, { useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import Spinner from '../layout/Spinner';
import DataAndMethodsContext from '../../context/dataAndMethods/dataAndMethodsContext';

const EmailTeam = () => {
    const dataAndMethodsContext = useContext(DataAndMethodsContext);

    useEffect(() => {
        // in place of component did mount
        dataAndMethodsContext.getUsersForEmail(my_team);
        dataAndMethodsContext.setEmail_subject('');
        dataAndMethodsContext.setEmail_bcc('');
        dataAndMethodsContext.setEmail_body('');
        dataAndMethodsContext.setEmail_cc('');
        // eslint-disable-next-line
    }, []);

    const { email_body,
        my_team,
        email_to,
        email_subject,
        email_cc,
        email_bcc,
        loading,
    } = dataAndMethodsContext;

    const onChange = e => {
        switch (e.target.name) {
            case 'email_subject':
                dataAndMethodsContext.setEmail_subject(e.target.value);
                break;
            case 'email_bcc':
                dataAndMethodsContext.setEmail_bcc(e.target.value);
                break;
            case 'email_body':
                dataAndMethodsContext.setEmail_body(e.target.value);
                break;
            case 'email_cc':
                dataAndMethodsContext.setEmail_cc(e.target.value);
                break;
            case 'email_to':
                dataAndMethodsContext.setEmail_to(e.target.value);
                break;
            default:
        }
    };

    const sendEmailPressed = () => {
        let myConvertedEmailBody = '';
        for (let i = 0; i < email_body.length; i++) {
            myConvertedEmailBody += convertForEmailMailTo(email_body[i]);
        }
        var mailto_link = 'mailto:' + email_to + '?subject=' + email_subject + '&cc=' + email_cc + '&bcc=' + email_bcc + '&body=' + myConvertedEmailBody;
        window.open(mailto_link, 'emailWindow');
    };

    const convertForEmailMailTo = (input) => {
        let myCharNumb = input.charCodeAt(0);
        if ((myCharNumb >= 65 && myCharNumb <= 90) || (myCharNumb >= 97 && myCharNumb <= 122) || (myCharNumb >= 48 && myCharNumb <= 57)) {
            return input;
        } else {
            let myHex = '00' + input.charCodeAt(0).toString(16);
            return '%' + myHex.slice(-2);
        }
    };

    if (loading) {
        return <Spinner />;
    } else {
        return (
            <div>
                <h3 className='page-top-margin'>Email team</h3>
                <p className='p'>
                    The following is a email form for team members that have public email addresses at dataAndMethods. You now can send them an invitation to collaborate using your installed email client.
                </p>
                <Link to='/myTeam' className='btn btn-light'>
                    <i className="fas fa-arrow-left"></i> My Team
                </Link>
                <button className='btn btn-light' onClick={sendEmailPressed}>
                    Send email
                </button>
                <p className='input-aws-table-label'>To</p>
                <input
                    type='text'
                    name='email_to'
                    placeholder=''
                    value={email_to}
                    onChange={onChange}
                    className='input-aws-table'
                />
                <p className='input-aws-table-label'>
                    Subject
                </p>
                <input
                    type='text'
                    name='email_subject'
                    placeholder=''
                    value={email_subject}
                    onChange={onChange}
                    className='input-aws-table'
                />
                <p className='input-aws-table-label'>CC</p>
                <input
                    type='text'
                    name='email_cc'
                    placeholder=''
                    value={email_cc}
                    onChange={onChange}
                    className='input-aws-table'
                />
                <p className='input-aws-table-label'>BCC</p>
                <input
                    type='text'
                    name='email_bcc'
                    placeholder=''
                    value={email_bcc}
                    onChange={onChange}
                    className='input-aws-table'
                />
                <p className='input-aws-table-label'>Your message</p>
                <textarea
                    name='email_body'
                    rows='20'
                    placeholder=''
                    value={email_body}
                    onChange={onChange}
                    className='text-area-aws-table'
                />
            </div>
        );
    }
};
export default EmailTeam;